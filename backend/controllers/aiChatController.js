const Doctor = require('../models/Doctor');
const Service = require('../models/Service');

const handleAiQuery = async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message prompt required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const userPrompt = message.trim();

    // 1. Fetch live clinic context from Database if available
    let clinicContext = '';
    try {
      const services = await Service.findAll({ where: { isActive: true }, attributes: ['name', 'category', 'priceRange', 'description'] });
      const doctors = await Doctor.findAll({ attributes: ['name', 'title', 'specialization', 'experience', 'consultationFee'] });

      if (services.length > 0) {
        clinicContext += '\nAvailable Dental Services & Pricing:\n' + services.map(s => `- ${s.name} (${s.category}): ${s.priceRange}. ${s.description}`).join('\n');
      }
      if (doctors.length > 0) {
        clinicContext += '\n\nOur Expert Doctors:\n' + doctors.map(d => `- ${d.name} (${d.title}): Specializes in ${d.specialization}, ${d.experience} exp. Consultation fee: $${d.consultationFee}`).join('\n');
      }
    } catch (dbErr) {
      // Database context optional, proceed without error
    }

    // System prompt with strict website & dental-only guardrails
    const systemPrompt = `You are Pearl Dental AI, the virtual dental assistant for Pearl Dental Studio (Lumina Dental Care).
Your goal is to guide visitors with warm, professional, high-end dental advice, procedure details, doctor recommendations, pricing, emergency dental guidance, and appointment scheduling.

CLINIC INFORMATION:
- Name: Pearl Dental Studio / Lumina Dental Care
- Address: 740 Park Avenue, Manhattan, NYC
- General Phone: +1 (800) 555-PEARL
- Emergency Hotline: +1 (800) 999-DENT
- Working Hours: Mon-Fri: 8:00 AM - 7:00 PM, Sat: 9:00 AM - 4:00 PM (Emergency 24/7)
${clinicContext}

STRICT GUARDRAIL RULE (CRITICAL):
You MUST ONLY answer questions related to Pearl Dental Studio, dentistry, tooth/mouth health, dental procedures (veneers, implants, Invisalign, whitening, root canals, crowns, braces, cleaning), pricing, appointments, clinic location, and doctors.
IF THE USER ASKS ANYTHING UNRELATED TO DENTISTRY OR THIS CLINIC (e.g. programming, mathematics, general history, recipes, weather, sports, politics, movie trivia, etc.):
You MUST politely decline and reply:
"I am Pearl Dental AI, specialized exclusively in dental care, smile transformations, and services at Pearl Dental Studio. How may I assist you with your dental health, treatment options, or booking an appointment today?"`;

    // 2. Call Google Gemini API if API key exists
    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            contents: [
              ...(Array.isArray(history) ? history.map(h => ({
                role: h.sender === 'user' ? 'user' : 'model',
                parts: [{ text: h.text }]
              })) : []),
              {
                role: 'user',
                parts: [{ text: userPrompt }]
              }
            ],
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 400
            }
          })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          const aiReply = data.candidates[0].content.parts[0].text;
          return res.json({
            success: true,
            reply: aiReply,
            suggestedActions: [
              { label: 'Book Appointment', action: '/appointment' },
              { label: 'View Services & Pricing', action: '/services' },
              { label: 'Our Doctors', action: '/doctors' }
            ]
          });
        }
      } catch (geminiError) {
        console.error('Gemini API call failed, using fallback:', geminiError.message);
      }
    }

    // 3. Fallback logic if GEMINI_API_KEY is not configured or fails
    const lower = userPrompt.toLowerCase();
    let reply = "Thank you for reaching out to Pearl Dental Care. ";

    // Basic keyword guardrail for fallback mode
    const dentalKeywords = ['dental', 'tooth', 'teeth', 'veneer', 'implant', 'invisalign', 'whitening', 'cost', 'price', 'pain', 'emergency', 'doctor', 'book', 'appointment', 'clean', 'braces', 'crown', 'fill', 'gum', 'smile', 'hello', 'hi', 'hey'];
    const isDentalRelated = dentalKeywords.some(kw => lower.includes(kw));

    if (!isDentalRelated) {
      reply = "I am Pearl Dental AI, specialized exclusively in dental care, smile transformations, and services at Pearl Dental Studio. How may I assist you with your dental health, treatment options, or booking an appointment today?";
    } else if (lower.includes('veneer') || lower.includes('porcelain') || lower.includes('smile makeover')) {
      reply += "Dr. Evelyn Sterling specializes in bespoke Porcelain Veneers using 3D Digital Smile Design. Veneers cost around $1,200 - $2,500 per tooth and last 15-20 years with natural light translucency. Would you like to schedule a 3D smile design consultation?";
    } else if (lower.includes('implant') || lower.includes('missing tooth') || lower.includes('tooth loss')) {
      reply += "Dr. Julian Vance leads our Implantology department using 3D Computer-Guided Titanium and Zirconia implants ($2,500 - $4,800). Would you like us to book a CBCT consultation?";
    } else if (lower.includes('invisalign') || lower.includes('braces') || lower.includes('align') || lower.includes('straight')) {
      reply += "Dr. Aria Chen is our Diamond Plus Invisalign Provider. Clear aligners average 6 to 12 months with invisible comfort ($3,500 - $6,500). We can provide an immediate 3D iTero digital preview!";
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('fee')) {
      reply += "Our treatments range from laser whitening ($450) to signature porcelain veneers ($1,200+) and dental implants ($2,500+). We offer 0% interest financing!";
    } else if (lower.includes('pain') || lower.includes('emergency')) {
      reply += "⚠️ If you are experiencing severe pain or swelling, please call our 24/7 Emergency Line immediately at +1 (800) 999-DENT!";
    } else {
      reply += "Pearl Dental Care provides world-class cosmetic, implant, and restorative dentistry at 740 Park Avenue, NYC. How may I assist you with your treatment or appointment booking today?";
    }

    return res.json({
      success: true,
      reply,
      suggestedActions: [
        { label: 'Book Appointment', action: '/appointment' },
        { label: 'View Services & Pricing', action: '/services' },
        { label: 'Our Doctors', action: '/doctors' }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { handleAiQuery };
