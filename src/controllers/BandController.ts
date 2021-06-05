import * as Yup from 'yup';

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class BandController {
    
    //função criar usuario
    async create(req: Request, res: Response) {

        const schema = Yup.object().shape({
            band_name: Yup.string().required()            
        });

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Validation fails'});
        }

        const bandExists = await prisma.bands.findFirst({ where: { band_name: req.body.band_name } });

        if (bandExists) {
            return res.status(400).json({ error: "Band already exists!" });
        }

        const data = {
          band_name: req.body.band_name,
          users_id_user: req.body.userId
        }
 
        const { id_band, band_name } = await prisma.bands.create({ data });

        return res.json({ id_band, band_name });
    }

}

export default new BandController();