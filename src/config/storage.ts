import * as multer from "multer";
import * as fs from 'fs';
import * as path from "path";
import { Constant } from "src/utils/constant";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            fs.mkdirSync(path.join(process.cwd(), `uploads/${Constant.CURRENT_DATE}`));
        }catch(e) {}

        cb(null, path.join(process.cwd(), `uploads/${Constant.CURRENT_DATE}`))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

export { storage };
