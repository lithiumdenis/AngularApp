using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularNote.Controllers
{
    public class NoteController : ApiController
    {

        DatabaseEntitiesNote db = new DatabaseEntitiesNote();

        // GET api/product
        public List<Note> Get()
        {
            return db.Note.ToList();
        }

        // GET api/product/5
        public Note Get(int id)
        {
            var note = db.Note.FirstOrDefault(s => s.Id == id);

            if (note != null)
                return note;

            throw new HttpResponseException(HttpStatusCode.NoContent);
        }

        // POST api/product
        public void Post(Note note)
        {
            note.Id = db.Note.Any() ? db.Note.Max(s => s.Id) + 1 : 1;
            db.Note.Add(note);
            db.SaveChanges();
        }

        // PUT api/product/5
        public void Put(Note newNote)
        {
            var note = db.Note.FirstOrDefault(s => s.Id == newNote.Id);

            if (note != null)
            {
                note.Date = newNote.Date;
                note.Description = newNote.Description;
                db.SaveChanges();
                return;
            }

            throw new HttpResponseException(HttpStatusCode.NoContent);
        }

        // DELETE api/product/5
        public List<Note> Delete(int id)
        {
            var note = db.Note.FirstOrDefault(s => s.Id == id);

            if (note == null)
                return db.Note.ToList();

            db.Note.Remove(note);
            db.SaveChanges();

            return db.Note.ToList();
        }
    }
}