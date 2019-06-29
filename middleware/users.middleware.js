module.exports.protectedRoute = (req, res, next) => {    
    const id = req.params.id;

    if(req.user._id.toString() !== id) {                
        return res.status(401).json({ 
            success: false,
            msg: 'Unauthorized'
        });
    }

    next();
}