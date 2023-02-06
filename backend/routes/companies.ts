import express from 'express';
import companyService from '../services/companyService';
import toNewCompanyEntry from '../utils/toNewCompanyEntry';

const companiesRouter = express.Router();

companiesRouter.get('/', async (_req, res) => {
  try {
    const chats = await companyService.getCompanies();
    res.send(chats);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

companiesRouter.get('/:id', async (req, res) => {
  try {
    const { id }: { id: string } = req.params;
    const chat = await companyService.getCompany(id);

    if (chat === null) {
      res.status(404).send({ error: 'Resource not found' });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).send({ error });
  }
});

companiesRouter.post('/', async (req, res) => {
  try {
    const newCompanyEntry = toNewCompanyEntry(req.body);
    const addedCompany = await companyService.addCompany(newCompanyEntry);
    res.json(addedCompany);
  } catch (error) {
    res.status(400).send({ error });
  }
});

companiesRouter.put('/:id', async (req, res) => {
  try {
    const newCompanyUpdate = toNewCompanyEntry(req.body);
    const updatedCompany = await companyService.updateCompany(
      req.params.id,
      newCompanyUpdate
    );
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).send({ error });
  }
});

companiesRouter.delete('/:id', async (req, res) => {
  try {
    const id: string = req.params.id;
    const deletedChat = await companyService.deleteCompany(id);

    if (deletedChat === null) {
      res.status(404).send({ error: 'Resource not found' });
    }

    res.json(deletedChat);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default companiesRouter;
