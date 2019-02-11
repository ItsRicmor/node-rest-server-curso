
const jwt = require('jsonwebtoken')
const { SEED } = process.env
/**
 * Verificar Token
 */

const verificaToken = (req, res, next) => {
    let token  = req.get('token')
    jwt.verify(token, SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }
        req.usuario = decoded.usuario
        next();
    })
}

/**
 * Verificar AdminRole
 */
const verificaAdminRole = (req, res, next) => {
    const { usuario } = req
    if(usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
    next();
}


module.exports = {
    verificaToken,
    verificaAdminRole
}