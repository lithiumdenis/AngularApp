using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularNote.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        // GET: All notes
        public JsonResult GetAllNotes()
        {
            using (var ctx = new NotesDBEntities())
            {
                var notesList = ctx.Note.ToList();
                return Json(notesList, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Note by Id
        public JsonResult GetNoteById(string id)
        {
            using (var ctx = new NotesDBEntities())
            {
                var noteId = Convert.ToInt32(id);
                var getNoteById = ctx.Note.Find(noteId);
                return Json(getNoteById, JsonRequestBehavior.AllowGet);
            }
        }

        // Update Note
        public string UpdateNote(Note note)
        {
            if(note != null)
            {
                using (var ctx = new NotesDBEntities())
                {
                    int noteId = Convert.ToInt32(note.Id);
                    Note _note = ctx.Note.Where(n => n.Id == noteId).FirstOrDefault();

                    _note.Date = note.Date;
                    _note.EncryptedText = note.EncryptedText;
                    ctx.SaveChanges();
                    return "Note updated successfully!";
                }
            }
            else
            {
                return "Invalid note record!";
            }
        }

        // Add Note
        public string AddNote(Note note)
        {
            if (note != null)
            {
                using (var ctx = new NotesDBEntities())
                {
                    ctx.Note.Add(note);
                    ctx.SaveChanges();
                    return "Note added successfully!";
                }
            }
            else
            {
                return "Invalid note record!";
            }
        }

        // Delete Note
        public string DeleteNote(string noteId)
        {
            if(!String.IsNullOrEmpty(noteId))
            {
                try
                {
                    int _noteId = Int32.Parse(noteId);
                    using (var ctx = new NotesDBEntities())
                    {
                        var _note = ctx.Note.Find(_noteId);
                        ctx.Note.Remove(_note);
                        ctx.SaveChanges();
                        return "Note removed successfully!";
                    }
                }
                catch
                {
                    return "Note details not found";
                }
            }
            else
            {
                return "Invalid operation";
            }
        }
    }
}