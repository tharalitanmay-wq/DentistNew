const handleAiQuery = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message prompt required' });
    }

    const lower = message.toLowerCase();
    let reply = "Thank you for reaching out to Lumina Dental Studio. ";

    if (lower.includes('veneer') || lower.includes('porcelain') || lower.includes('smile makeover')) {
      reply += "Dr. Evelyn Sterling specializes in bespoke Porcelain Veneers using 3D Digital Smile Design. Veneers cost around $1,200 - $2,500 per tooth and last 15-20 years with natural light translucency. Would you like to schedule a 3D smile design consultation?";
    } else if (lower.includes('implant') || lower.includes('missing tooth') || lower.includes('tooth loss')) {
      reply += "Dr. Julian Vance leads our Implantology department using 3D Computer-Guided Titanium and Zirconia implants. Implants preserve your jawbone and provide a permanent solution ($2,500 - $4,800). Would you like us to book a CBCT consultation?";
    } else if (lower.includes('invisalign') || lower.includes('braces') || lower.includes('align') || lower.includes('straight')) {
      reply += "Dr. Aria Chen is our Diamond Plus Invisalign Provider. Clear aligners average 6 to 12 months with invisible comfort ($3,500 - $6,500). We can provide an immediate 3D iTero digital preview of your outcome!";
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('expensive')) {
      reply += "Our treatments range from laser whitening ($450) to signature porcelain veneers ($1,200+) and dental implants ($2,500+). We offer flexible zero-interest financing plans and assist with concierge insurance filing.";
    } else if (lower.includes('pain') || lower.includes('emergency') || lower.includes('bleeding') || lower.includes('broken')) {
      reply += "⚠️ If you are experiencing severe pain, tooth fracture, or swelling, please call our 24/7 Concierge Emergency Line immediately at +1 (800) 999-DENT or tap the Emergency Request button above for priority booking!";
    } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule') || lower.includes('slot')) {
      reply += "You can book directly using our interactive Booking Wizard on the website, or let me know your preferred date, time, and doctor, and I will assist you immediately!";
    } else {
      reply += "Lumina Dental Studio provides world-class cosmetic, implant, and restorative dentistry at 740 Park Avenue, NYC. How may I assist you with your treatment, appointment booking, or doctor selection today?";
    }

    return res.json({
      success: true,
      reply,
      suggestedActions: [
        { label: 'Book Appointment', action: '/appointment' },
        { label: 'Calculate Treatment Cost', action: '/services' },
        { label: 'View Doctor Profiles', action: '/doctors' }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { handleAiQuery };
