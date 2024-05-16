import  { db} from './db.js'
import { v4 as uuidv4 } from 'uuid'; 
export function setupTagRoutes(app) {
//add Tag
app.post('/add-tag', async (req, res) => {
    const checkTag = await db('tags').select('*').where('name', req.body.name).first()
    if (!checkTag){
      let ident = uuidv4();
      const tag = {
          id: ident,
          name: req.body.name,
          category: req.body.category,
          description: req.body.description
    };
      await db('tags').insert(tag);
      res.redirect('/')
    }else{
      console.log("already exists")
    }
  })
  //remove Tag
  app.get('/delete-tag', async (req, res) => {
    if (!req.body.id) return next()
        const book = await db('tags').select('*').where('id', req.body.id).first()
        if (!book) return next()
        await db('tags').where('id', book.id).del();
        res.redirect('/')
  })
  //load all Tags
  app.post('/load-allTags', async (req, res) => {
    const tags = await db('tags').select('*').orderBy('name');
    res.json(tags);
  })

  //load displayed Tags
  app.post('/load-displayed', async (req, res) => {
    res.render('basicView', {
      title: 'Test',
    })
  })



}