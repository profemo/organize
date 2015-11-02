/**
 * Easy to use Wizard library for AngularJS
 * @version v0.4.2 - 2015-04-03 * @link https://github.com/mgonto/angular-wizard
 * @author Martin Gontovnikas <martin@gon.to>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
function wizardButtonDirective(e){angular.module("mgo-angular-wizard").directive(e,function(){return{restrict:"A",replace:!1,require:"^wizard",link:function(t,n,i,r){n.on("click",function(n){n.preventDefault(),t.$apply(function(){t.$eval(i[e]),r[e.replace("wz","").toLowerCase()]()})})}}})}angular.module("templates-angularwizard",["step.html","wizard.html"]),angular.module("step.html",[]).run(["$templateCache",function(e){e.put("step.html",'<section ng-show="selected" ng-class="{current: selected, done: completed}" class="step" ng-transclude>\n</section>')}]),angular.module("wizard.html",[]).run(["$templateCache",function(e){e.put("wizard.html",'<div>\n    <div class="steps" ng-transclude></div>\n    <ul class="steps-indicator steps-{{steps.length}}" ng-if="!hideIndicators">\n      <li ng-class="{default: !step.completed && !step.selected, current: step.selected && !step.completed, done: step.completed && !step.selected, editing: step.selected && step.completed}" ng-repeat="step in steps">\n        <a ng-click="goTo(step)">{{step.title || step.wzTitle}}</a>\n      </li>\n    </ul>\n</div>\n')}]),angular.module("mgo-angular-wizard",["templates-angularwizard"]),angular.module("mgo-angular-wizard").directive("wzStep",function(){return{restrict:"EA",replace:!0,transclude:!0,scope:{wzTitle:"@",title:"@",canenter:"=",canexit:"="},require:"^wizard",templateUrl:function(e,t){return t.template||"step.html"},link:function(e,t,n,i){e.title=e.title||e.wzTitle,i.addStep(e)}}}),angular.module("mgo-angular-wizard").directive("wizard",function(){return{restrict:"EA",replace:!0,transclude:!0,scope:{currentStep:"=",onFinish:"&",hideIndicators:"=",editMode:"=",name:"@"},templateUrl:function(e,t){return t.template||"wizard.html"},controller:["$scope","$element","$log","WizardHandler",function(e,t,n,i){function r(){_.each(e.steps,function(e){e.selected=!1}),e.selectedStep=null}var s=!0;i.addWizard(e.name||i.defaultName,this),e.$on("$destroy",function(){i.removeWizard(e.name||i.defaultName)}),e.steps=[],e.context={},e.$watch("currentStep",function(t){if(t){var n=e.selectedStep.title||e.selectedStep.wzTitle;e.selectedStep&&n!==e.currentStep&&e.goTo(_.findWhere(e.steps,{title:e.currentStep}))}}),e.$watch("[editMode, steps.length]",function(){var t=e.editMode;_.isUndefined(t)||_.isNull(t)||t&&_.each(e.steps,function(e){e.completed=!0})},!0),this.addStep=function(t){e.steps.push(t),1===e.steps.length&&e.goTo(e.steps[0])},this.context=e.context,e.getStepNumber=function(t){return _.indexOf(e.steps,t)+1},e.goTo=function(t,n){if(s)r(),e.selectedStep=t,_.isUndefined(e.currentStep)||(e.currentStep=t.title||t.wzTitle),t.selected=!0,e.$emit("wizard:stepChanged",{step:t,index:_.indexOf(e.steps,t)}),s=!1;else{var i,a=!1,c=!1;if(e.currentStepNumber()>0?i=e.currentStepNumber()-1:0===e.currentStepNumber()&&(i=0),("undefined"==typeof e.steps[i].canexit||e.steps[i].canexit(e.context)===!0)&&(a=!0),e.getStepNumber(t)<e.currentStepNumber()&&(a=!0),(a&&void 0===t.canenter||a&&t.canenter(e.context)===!0)&&(c=!0),!a||!c)return;r(),e.selectedStep=t,_.isUndefined(e.currentStep)||(e.currentStep=t.title||t.wzTitle),t.selected=!0,e.$emit("wizard:stepChanged",{step:t,index:_.indexOf(e.steps,t)})}if(n)for(var l=e.steps.indexOf(_.find(e.steps,function(t,n){return t.title===e.currentStep?n:void 0})),d=l-1;d>-1;d--)e.steps[d].completed=!0},e.currentStepNumber=function(){return _.indexOf(e.steps,e.selectedStep)+1},this.currentStepNumber=function(){return e.currentStepNumber()},this.next=function(t){var n=_.indexOf(e.steps,e.selectedStep);if(angular.isFunction(t)){if(!t())return;n===e.steps.length-1?this.finish():e.goTo(e.steps[n+1])}t||(e.selectedStep.completed=!0),n===e.steps.length-1?this.finish():e.goTo(e.steps[n+1])},this.goTo=function(t,n){n=n||!1;var i;i=_.isNumber(t)?e.steps[t]:_.findWhere(e.steps,{title:t}),e.goTo(i,n)},this.finish=function(){e.onFinish&&e.onFinish()},this.cancel=this.previous=function(){var t=_.indexOf(e.steps,e.selectedStep);if(0===t)throw new Error("Can't go back. It's already in step 0");e.goTo(e.steps[t-1])}}]}}),wizardButtonDirective("wzNext"),wizardButtonDirective("wzPrevious"),wizardButtonDirective("wzFinish"),wizardButtonDirective("wzCancel"),angular.module("mgo-angular-wizard").factory("WizardHandler",function(){var e={},t={};return e.defaultName="defaultWizard",e.addWizard=function(e,n){t[e]=n},e.removeWizard=function(e){delete t[e]},e.wizard=function(n){var i=n;return n||(i=e.defaultName),t[i]},e});