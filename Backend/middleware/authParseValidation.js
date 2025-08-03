export const validationSchema = (schema) => async( req , res , next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {    
        const error = err.issues[0].message
        res.json({ message :error })
    }
}