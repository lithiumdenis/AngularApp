/**
 * Module for displaying "Waiting for..." dialog using Bootstrap
 *
 * @author Eugene Maslovich <ehpc@em42.ru>
 */
var waitingDialog=waitingDialog||function(e){var a=e('<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;"><div class="modal-dialog modal-m"><div class="modal-content"><div class="modal-header"><h3 style="margin:0;"></h3></div><div class="modal-body"><div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div></div></div></div></div>');
return{show:function(c,d){"undefined"===typeof d&&(d={});"undefined"===typeof c&&(c="Загрузка...");var b=e.extend({dialogSize:"m",progressType:"",onHide:null},d);a.find(".modal-dialog").attr("class","modal-dialog").addClass("modal-"+b.dialogSize);a.find(".progress-bar").attr("class","progress-bar");b.progressType&&a.find(".progress-bar").addClass("progress-bar-"+b.progressType);a.find("h3").text(c);if("function"===typeof b.onHide)a.off("hidden.bs.modal").on("hidden.bs.modal",function(c){b.onHide.call(a)});
a.modal()},hide:function(){a.modal("hide")}}}(jQuery);