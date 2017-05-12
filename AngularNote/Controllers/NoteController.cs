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

        // GET api/note
        //Возврат полного списка заметок
        public List<Note> Get()
        {
            return db.Note.ToList();
        }

        // GET api/note/5
        //Возвращает отдельную заметку
        public Note Get(int id)
        {
            var note = db.Note.FirstOrDefault(s => s.Id == id);

            if (note != null)
                return note;

            throw new HttpResponseException(HttpStatusCode.NoContent);
        }

        // POST api/note
        //Для создания новых заметок
        public void Post(Note note)
        {
            note.Id = db.Note.Any() ? db.Note.Max(s => s.Id) + 1 : 1;
            //Задаём время создания и изменения идентичными
            note.Created = DateTime.Now.ToUniversalTime(); //Гринвич UTC+0
            note.Changed = DateTime.Now.ToUniversalTime();
            db.Note.Add(note);
            db.SaveChanges();
        }

        // PUT api/note/5
        //Функция для обновления существующей записи по id
        public void Put(Note newNote)
        {
            var note = db.Note.FirstOrDefault(s => s.Id == newNote.Id);

            if (note != null)
            {
                note.Description = newNote.Description;
                note.Title = newNote.Title;
                //Меняем время изменения на текущее
                note.Changed = DateTime.Now.ToUniversalTime(); //Гринвич UTC+0; 
                db.SaveChanges();
                return;
            }

            throw new HttpResponseException(HttpStatusCode.NoContent);
        }

        // DELETE api/note/5
        //Удаление записей по id
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