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
        public IQueryable<Note> GetNotes()
        {
            return db.Note;
        }

        //GET: api/Notes/5
        //Возвращает отдельную заметку
        [Route("api/Notes/{id}")]
        [ResponseType(typeof(Note))]
        [System.Web.Http.HttpGet]
        public async Task<IHttpActionResult> GetNote(int id)
        {
            Note note = await db.Note.FindAsync(id);
            if (note == null)
                return NotFound();
            return Ok(note);
        }

        //PUT: api/Notes/5
        //Функция для обновления существующей записи по id
        [Route("api/Notes/{id}")]
        [ResponseType(typeof(void))]
        [System.Web.Http.HttpPut]
        public async Task<IHttpActionResult> PutNote(int id, [FromBody] Note note)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != note.Id)
                return BadRequest();

            db.Entry(note).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
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
        public async Task<IHttpActionResult> PostNote(Note note)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            note.Date = DateTime.Now.ToString();

            db.Note.Add(note);
            await db.SaveChangesAsync();
            return CreatedAtRoute("DefaultApi", new { id = note.Id }, note);
        }

        // DELETE: api/Notes/5
        //Удаление записей по id
        [Route("api/Notes/{id}")]
        [ResponseType(typeof(Note))]
        [System.Web.Http.HttpDelete]
        public async Task<IHttpActionResult> DeleteNote(int id)
        {
            Note note = await db.Note.FindAsync(id);
            if (note == null)
                return NotFound();

            db.Note.Remove(note);
            await db.SaveChangesAsync();
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

        //public ActionResult Index()
        //{
        //    return View();
        //}

        //// GET: All notes
        //public JsonResult GetAllNotes()
        //{
        //    using (var ctx = new DatabaseNoteEntities())
        //    {
        //        var notesList = ctx.Note.ToList();
        //        return Json(notesList, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //// GET: Note by Id
        //public JsonResult GetNoteById(string id)
        //{
        //    using (var ctx = new DatabaseNoteEntities())
        //    {
        //        var noteId = Convert.ToInt32(id);
        //        var getNoteById = ctx.Note.Find(noteId);
        //        return Json(getNoteById, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //// Update Note
        //public string UpdateNote(Note note)
        //{
        //    if (note != null)
        //    {
        //        using (var ctx = new DatabaseNoteEntities())
        //        {
        //            int noteId = Convert.ToInt32(note.Id);
        //            Note _note = ctx.Note.Where(n => n.Id == noteId).FirstOrDefault();

        //            _note.Date = note.Date;
        //            _note.EncryptedText = note.EncryptedText;
        //            ctx.SaveChanges();
        //            return "Note updated successfully!";
        //        }
        //    }
        //    else
        //    {
        //        return "Invalid note record!";
        //    }
        //}

        //// Add Note
        //public string AddNote(Note note)
        //{
        //    if (note != null)
        //    {
        //        using (var ctx = new DatabaseNoteEntities())
        //        {
        //            ctx.Note.Add(note);
        //            ctx.SaveChanges();
        //            return "Note added successfully!";
        //        }
        //    }
        //    else
        //    {
        //        return "Invalid note record!";
        //    }
        //}

        //// Delete Note
        //public string DeleteNote(string noteId)
        //{
        //    if (!String.IsNullOrEmpty(noteId))
        //    {
        //        try
        //        {
        //            int _noteId = Int32.Parse(noteId);
        //            using (var ctx = new DatabaseNoteEntities())
        //            {
        //                var _note = ctx.Note.Find(_noteId);
        //                ctx.Note.Remove(_note);
        //                ctx.SaveChanges();
        //                return "Note removed successfully!";
        //            }
        //        }
        //        catch
        //        {
        //            return "Note details not found";
        //        }
        //    }
        //    else
        //    {
        //        return "Invalid operation";
        //    }
        //}
    }
}