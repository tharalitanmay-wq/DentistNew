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
      // Optional context
    }

    // System prompt: Full AI Assistant representing Pearl Dental Studio
    const systemPrompt = `You are Pearl Dental AI, an intelligent, friendly, and highly knowledgeable AI assistant representing Pearl Dental Studio (Lumina Dental Care).

YOUR CORE BEHAVIOR:
- Answer ANY question the user asks clearly, accurately, and helpfully (whether it is about dentistry, oral health, general knowledge, advice, lifestyle, or anything else).
- Always maintain a warm, polite, professional tone.
- Whenever relevant, connect your answer back to Pearl Dental Studio's services, doctors, pricing, or appointment booking.

CLINIC INFORMATION & CONTEXT:
- Clinic Name: Pearl Dental Studio / Lumina Dental Care
- Address: 740 Park Avenue, Manhattan, NYC
- General Phone: +1 (800) 555-PEARL
- Emergency Hotline: +1 (800) 999-DENT
- Working Hours: Mon-Fri: 8:00 AM - 7:00 PM, Sat: 9:00 AM - 4:00 PM (Emergency 24/7)
${clinicContext}`;

    // 2. Call Google Gemini API if API key exists
    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
      // Gemini API requires contents to start with 'user' role and alternate user/model/user/model
      let validContents = [];
      if (Array.isArray(history)) {
        for (const h of history) {
          if (!h.text || typeof h.text !== 'string') continue;
          const role = h.sender === 'user' ? 'user' : 'model';
          // Skip leading model messages
          if (validContents.length === 0 && role !== 'user') continue;
          // Avoid duplicate consecutive roles
          if (validContents.length > 0 && validContents[validContents.length - 1].role === role) continue;
          validContents.push({ role, parts: [{ text: h.text }] });
        }
      }

      // Ensure history ends with 'model' before adding current user message so turns strictly alternate
      if (validContents.length > 0 && validContents[validContents.length - 1].role === 'user') {
        validContents.pop();
      }
      validContents.push({ role: 'user', parts: [{ text: userPrompt }] });

      // Active working Google Gemini models
      const modelsToTry = [
        'gemini-3.6-flash',
        'gemini-3.5-flash-lite',
        'gemini-flash-latest'
      ];

      for (const model of modelsToTry) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemPrompt }] },
              contents: validContents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600
              }
            })
          });

          const data = await response.json();

          if (response.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            const aiReply = data.candidates[0].content.parts[0].text;
            console.log(`Successfully generated AI response using model: ${model}`);
            return res.json({
              success: true,
              reply: aiReply,
              suggestedActions: [
                { label: 'Book Appointment', action: '/appointment' },
                { label: 'View Services & Pricing', action: '/services' },
                { label: 'Our Doctors', action: '/doctors' }
              ]
            });
          } else {
            console.error(`Gemini model ${model} error response (${response.status}):`, JSON.stringify(data));
          }
        } catch (mErr) {
          console.error(`Error calling Gemini model ${model}:`, mErr.message);
        }
      }
    } else {
      console.warn('GEMINI_API_KEY is missing or unconfigured in .env');
    }

    // 3. Fallback response if GEMINI_API_KEY is missing or fails
    const lower = userPrompt.toLowerCase();
    let reply = "Hello! I am Pearl Dental AI Assistant. ";

    if (lower.includes('veneer') || lower.includes('porcelain') || lower.includes('smile makeover')) {
      reply += "Dr. Evelyn Sterling specializes in bespoke Porcelain Veneers using 3D Digital Smile Design. Veneers cost around $1,200 - $2,500 per tooth and last 15-20 years. Would you like to schedule a 3D smile design consultation?";
    } else if (lower.includes('implant') || lower.includes('missing tooth') || lower.includes('tooth loss')) {
      reply += "Dr. Julian Vance leads our Implantology department using 3D Computer-Guided Titanium and Zirconia implants ($2,500 - $4,800). Would you like to book a CBCT consultation?";
    } else if (lower.includes('invisalign') || lower.includes('braces') || lower.includes('align') || lower.includes('straight')) {
      reply += "Dr. Aria Chen is our Diamond Plus Invisalign Provider. Clear aligners average 6 to 12 months with invisible comfort ($3,500 - $6,500). We can provide an immediate 3D iTero digital preview!";
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('fee')) {
      reply += "Our treatments range from laser whitening ($450) to signature porcelain veneers ($1,200+) and dental implants ($2,500+). We offer 0% interest financing!";
    } else if (lower.includes('pain') || lower.includes('emergency')) {
      reply += "⚠️ If you are experiencing severe pain or swelling, please call our 24/7 Emergency Line immediately at +1 (800) 999-DENT!";
    } else {
      reply += `Thank you for asking! As your Pearl Dental AI Assistant, I can answer your questions, provide details on treatments, pricing, and book your appointment at our 740 Park Avenue, NYC studio. How can I help you today?`;
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
