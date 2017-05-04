﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace AngularNote
{
    public class RouteConfig
    {
        public static void RegisterRoutes(HttpConfiguration routes)
        {
            //routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapHttpAttributeRoutes();

            routes.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
