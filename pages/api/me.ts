import { validateRoute } from "../../lib/auth";

export default validateRoute((req, res, user) => {
    return res.json(user);
})