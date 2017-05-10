using System.Web;
using System.Web.Optimization;

namespace AngularNote
{
    public class BundleConfig
    {
        //Дополнительные сведения об объединении см. по адресу: http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // используйте средство сборки на сайте http://modernizr.com, чтобы выбрать только нужные тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/ui-bootstrap-tpls-0.11.0.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angularJS").Include(
                     "~/Scripts/angular.js",
                     "~/Scripts/angular-route.js",
                     "~/Scripts/angular-resource.js"));

            bundles.Add(new ScriptBundle("~/bundles/customJS").Include(
                                 "~/Scripts/app/app.js",
                                 "~/Scripts/app/notesController.js",
                                 "~/Scripts/app/NoteAddController.js",
                                 "~/Scripts/app/NoteEditController.js"));
        }
    }
}
