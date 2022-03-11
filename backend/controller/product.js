const getAllProducts = async (req, res) => {
    const {user, role} = req.headers;
    res.json({ product: { user, role } })
}

module.exports = {
    getAllProducts
}