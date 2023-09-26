const sendEmailValidation = (req, res, next) => {
    const {userName,toEmailAddress,subject,text, template} = req.body
  
    if (!userName) return res.status(404).json({ error: 'Missing userName' });
    if (!toEmailAddress) return res.status(404).json({ error: 'Missing to email address' });
    if (!subject) return res.status(404).json({ error: 'Missing subject' });
    if (!text && template!=='register' && template!=='review' && template!=='bookingConfirmation' && template!=='bookingCancelation') return res.status(404).json({ error: 'Missing text' });
    if (!template) return res.status(404).json({ error: 'Missing template' });
    
  
    next();
    };
  
    module.exports = sendEmailValidation;