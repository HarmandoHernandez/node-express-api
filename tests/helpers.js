const supertest = require('supertest')
const { app } = require('../index')

const api = supertest(app)

// Valores predeterminados para test
const initialNotes = [
  { content: 'tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat', important: false, date: '12/25/2021' },
  { content: 'faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut', important: false, date: '5/18/2021' },
  { content: 'semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis', important: false, date: '2/13/2021' },
  { content: 'sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at', important: true, date: '3/13/2021' },
  { content: 'justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices', important: false, date: '6/4/2021' },
  { content: 'sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel', important: true, date: '2/24/2021' },
  { content: 'vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet', important: false, date: '2/26/2021' },
  { content: 'id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo', important: true, date: '5/20/2021' },
  { content: 'congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio', important: true, date: '9/19/2021' },
  { content: 'sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus', important: false, date: '12/12/2021' }
]

const createNote = async (note) => {
  await api
    .post('/api/notes')
    .send(note)
    .expect(400)
}

const getNotes = async () => {
  const response = await api.get('/api/notes')
  return response.body.map((note) => note.content)
}

const updateNote = async (note) => {
  await api.put('/api/notes')
    .send(note)
    .expect(200)
}

const deleteNote = async (id) => {
  await api.delete('/api/notes')
    .send(id)
    .expect(204)
}

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map((note) => note.content),
    response
  }
}

module.exports = { initialNotes, api, getAllContentFromNotes, createNote, getNotes, updateNote, deleteNote }
