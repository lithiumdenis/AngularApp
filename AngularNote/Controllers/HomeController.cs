using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;


namespace AngularNote.Controllers
{
    public class HomeController : ApiController
    {
        private DatabaseNoteEntities db = new DatabaseNoteEntities();

        //GET: api/Notes
        //Возврат полного списка заметок
        [Route("api/Notes/")]
        [System.Web.Http.HttpGet]
        [System.Web.Http.HttpPut]
        [System.Web.Http.HttpDelete]
        public IQueryable<Note> GetNotes()//++
        {
            return db.Note;
        }

        //GET: api/Notes/5
        //Возвращает отдельную заметку
        [Route("api/Notes/{id}")]
        [ResponseType(typeof(Note))]
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetNote(int id)//++
        {
            Note note = db.Note.Find(id);
            if (note == null)
                return NotFound();
            return Ok(note);
        }

        //PUT: api/Notes/5
        //Функция для обновления существующей записи по id
        [Route("api/Notes/{id}")]
        [ResponseType(typeof(void))]
        [System.Web.Http.HttpPut]
        public IHttpActionResult PutNote(int id, Note note)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != note.Id)
                return BadRequest();


            
            Note _note = db.Note.Where(n => n.Id == id).FirstOrDefault();

            _note.Date = note.Date;
            _note.EncryptedText = note.EncryptedText;
            //            ctx.SaveChanges();


            //db.Entry(note).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                    return NotFound();
                else
                    throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Notes
        //Для создания новых заметок
        [Route("api/Notes/")]
        [ResponseType(typeof(Note))]
        [System.Web.Http.HttpPost]
        public IHttpActionResult PostNote(Note note)//++
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            note.Date = DateTime.Now.ToString();
            note.UserId = 1;

            db.Note.Add(note);
            db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = note.Id }, note);
        }

        // DELETE: api/Notes/5
        //Удаление записей по id
        [Route("api/Notes/{id}")]
        [ResponseType(typeof(Note))]
        [System.Web.Http.HttpDelete]
        public IHttpActionResult DeleteNote(int id)//++
        {
            Note note = db.Note.Find(id);
            if (note == null)
                return NotFound();

            db.Note.Remove(note);
            db.SaveChanges();
            return Ok(note);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NoteExists(int id)
        {
            return db.Note.Count(e => e.Id == id) > 0;
        }
    }
}