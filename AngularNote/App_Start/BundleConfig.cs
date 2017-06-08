using System.Web;
using System.Web.Optimization;

namespace AngularNote
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/ui-bootstrap-tpls-0.11.0.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Site.css",
                      "~/Content/quill.bubble.css",
                      "~/Content/quill.snow.css",
                      "~/Content/sweetalert.css"));

            bundles.Add(new ScriptBundle("~/bundles/angularJS").Include(
                     "~/Scripts/angular.js",
                     "~/Scripts/angular-route.js"));

            bundles.Add(new ScriptBundle("~/bundles/customJS").Include(
                                 "~/Scripts/app/app.js",
                                 "~/Scripts/app/notesController.js",
                                 "~/Scripts/app/NoteAddController.js",
                                 "~/Scripts/app/NoteEditController.js",
                                 "~/Scripts/app/NoteShowController.js",
                                 "~/Scripts/quill.js",
                                 "~/Scripts/ng-quill.js",
                                 "~/Scripts/sweetalert.min.js"));
        }
    }
}
