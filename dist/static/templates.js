'use strict';

// file automatically generated by angular-template-cache

angular
	.module('templates', [])
	.run(['$templateCache', function($templateCache) {
		$templateCache.put('components/acts/acts.html', '');

		$templateCache.put('components/application-card/application-card.html', '{{ $ctrl.application }}\n' +
			'\n' +
			'<md-card>\n' +
			'    <md-card-title>\n' +
			'        <md-card-title-text>\n' +
			'            <span class="md-headline">{{ $ctrl.application.name }}</span>\n' +
			'            <span class="md-subhead">{{ $ctrl.application.type }}, {{ $ctrl.application.town }}, {{ $ctrl.application.requested_fee }}</span>\n' +
			'            <p>{{ $ctrl.application.bio }}</p>\n' +
			'        </md-card-title-text>\n' +
			'        <md-card-title-media>\n' +
			'            <div class="md-media-lg card-media">\n' +
			'                <img ng-if="$ctrl.application.image" src="{{ $ctrl.application.image }}">\n' +
			'            </div>\n' +
			'        </md-card-title-media>\n' +
			'    </md-card-title>\n' +
			'    <md-card-actions layout="row" layout-align="end center">\n' +
			'        <md-button href="{{ $ctrl.application.link }}">Website</md-button>\n' +
			'        <md-button href="{{ $ctrl.application.facebook }}">Facebook</md-button>\n' +
			'        <md-button href="{{ $ctrl.application.twitter }}">Twitter</md-button>\n' +
			'    </md-card-actions>\n' +
			'</md-card>');

		$templateCache.put('components/application-editor/application-editor.html', '<md-dialog aria-label="New Application">\n' +
			'    <md-dialog-content class="md-dialog-content">\n' +
			'        <form novalidate ng-cloak>\n' +
			'            <div layout="column">\n' +
			'                <h2 class="md-title">Application</h2>\n' +
			'\n' +
			'                <div layout-gt-sm="row">\n' +
			'                    <md-input-container>\n' +
			'                        <label>Act Name</label>\n' +
			'                        <input ng-model="$ctrl.application.details.name">\n' +
			'                    </md-input-container>\n' +
			'\n' +
			'                    <md-input-container>\n' +
			'                        <label>Type</label>\n' +
			'                        <input ng-model="$ctrl.application.details.type">\n' +
			'                    </md-input-container>\n' +
			'\n' +
			'                    <md-input-container>\n' +
			'                        <label>Town</label>\n' +
			'                        <input ng-model="$ctrl.application.details.town">\n' +
			'                    </md-input-container>\n' +
			'                </div>\n' +
			'\n' +
			'                <div layout-gt-sm="row">\n' +
			'                    <md-input-container>\n' +
			'                        <label>Act Size</label>\n' +
			'                        <input ng-model="$ctrl.application.details.size_of_act">\n' +
			'                    </md-input-container>\n' +
			'\n' +
			'                    <md-input-container>\n' +
			'                        <label>Party Size</label>\n' +
			'                        <input ng-model="$ctrl.application.details.size_of_party">\n' +
			'                    </md-input-container>\n' +
			'                \n' +
			'                    <md-input-container>\n' +
			'                        <label>Requested Fee</label>\n' +
			'                        <input ng-model="$ctrl.application.details.requested_fee">\n' +
			'                    </md-input-container>\n' +
			'                </div>\n' +
			'\n' +
			'                <h3 class="md-subhead">Contact</h3>\n' +
			'\n' +
			'                <div layout-gt-sm="row">\n' +
			'                    <md-input-container>\n' +
			'                        <label>Name</label>\n' +
			'                        <input ng-model="$ctrl.application.details.contact_name">\n' +
			'                    </md-input-container>\n' +
			'\n' +
			'                    <md-input-container>\n' +
			'                        <label>Email</label>\n' +
			'                        <input ng-model="$ctrl.application.details.email">\n' +
			'                    </md-input-container>\n' +
			'\n' +
			'                    <md-input-container>\n' +
			'                        <label>Phone</label>\n' +
			'                        <input ng-model="$ctrl.application.details.phone">\n' +
			'                    </md-input-container>\n' +
			'                </div>\n' +
			'\n' +
			'                <div layout-gt-sm="row">\n' +
			'                    <md-input-container>\n' +
			'                        <label>Link</label>\n' +
			'                        <input ng-model="$ctrl.application.details.link">\n' +
			'                    </md-input-container>\n' +
			'\n' +
			'                    <md-input-container>\n' +
			'                        <label>Facebook</label>\n' +
			'                        <input ng-model="$ctrl.application.details.facebook">\n' +
			'                    </md-input-container>\n' +
			'\n' +
			'                    <md-input-container>\n' +
			'                        <label>Twitter</label>\n' +
			'                        <input ng-model="$ctrl.application.details.twitter">\n' +
			'                    </md-input-container>\n' +
			'                </div>\n' +
			'\n' +
			'                <h3 class="md-subhead">Details</h3>\n' +
			'\n' +
			'                <div layout-gt-sm="row">\n' +
			'                    <md-input-container>\n' +
			'                        <label>Party Names</label>\n' +
			'                        <input ng-model="$ctrl.application.details.party_names">\n' +
			'                    </md-input-container>\n' +
			'                </div>\n' +
			'\n' +
			'                <div layout-gt-sm="row">\n' +
			'                    <md-input-container>\n' +
			'                        <label>Bio</label>\n' +
			'                        <textarea ng-model="$ctrl.application.details.bio">\n' +
			'                        </textarea>\n' +
			'                    </md-input-container>\n' +
			'                </div>\n' +
			'\n' +
			'                <div layout-gt-sm="row">\n' +
			'                    <md-input-container>\n' +
			'                        <label>Tech Specs</label>\n' +
			'                        <textarea ng-model="$ctrl.application.details.tech_specs">\n' +
			'                        </textarea>\n' +
			'                    </md-input-container>\n' +
			'                </div>\n' +
			'\n' +
			'                <div layout-gt-sm="row">\n' +
			'                    <md-input-container>\n' +
			'                        <label>Image</label>\n' +
			'                        <input ng-model="$ctrl.application.details.image">\n' +
			'                    </md-input-container>\n' +
			'                </div>\n' +
			'\n' +
			'\n' +
			'                <img ng-if="$ctrl.application.details.image" src="{{ $ctrl.application.details.image }}">\n' +
			'            </div>\n' +
			'        </form>\n' +
			'    </md-dialog-content>\n' +
			'    <md-dialog-actions>\n' +
			'        <md-button ng-click="$ctrl.save()">Save</md-button>\n' +
			'        <md-button ng-click="$ctrl.cancel()">Cancel</md-button>\n' +
			'    </md-dialog-actions>\n' +
			'</md-dialog>');

		$templateCache.put('components/applications-summary/applications-summary.html', '<application-card ng-repeat="application in $ctrl.applications" application="application">\n' +
			'</application-card>');

		$templateCache.put('components/applications-table/applications-table.html', '<script type="text/ng-template" id="/applications-header.html">\n' +
			'  <th md-column md-order-by="createdAt"><span>Recieved</span></th>\n' +
			'  <th md-column md-order-by="name"><span>Name</span></th>\n' +
			'  <th md-column md-order-by="type"><span>Type</span></th>\n' +
			'  <th md-column md-order-by="town"><span>Town</span></th>\n' +
			'  <th md-column md-order-by="size_of_party"><span>Size</span></th>\n' +
			'  <th md-column md-order-by="requested_fee"><span>Fee Request</span></th>\n' +
			'  <th md-column><span></span></th>\n' +
			'</script>\n' +
			'\n' +
			'<script type="text/ng-template" id="/applications-cell.html">\n' +
			'  <td md-cell>{{ data.createdAt | date: \'mediumDate\' }}</td>\n' +
			'  <td md-cell>{{ data.name }}</td>\n' +
			'  <td md-cell>{{ data.type }}</td>\n' +
			'  <td md-cell>{{ data.town }}</td>\n' +
			'  <td md-cell>{{ data.size_of_act }} / {{ data.size_of_party }}</td>\n' +
			'  <td md-cell>{{ data.requested_fee }}</td>\n' +
			'  <td md-cell> \n' +
			'    <md-select ng-model="$ctrl.menu" placeholder="Menu">      \n' +
			'      <md-option ng-value="website">Website</md-option>\n' +
			'      <md-option ng-value="facebook">Facebook</md-option>\n' +
			'      <md-option ng-value="facebook">Twitter</md-option>\n' +
			'    </md-select>\n' +
			'  </td>\n' +
			'</script>\n' +
			'\n' +
			'<ep-table title="\'Applications\'" on-list="$ctrl.getApplications(query)" on-create="$ctrl.create()" header-template="\'/applications-header.html\'" cell-template="\'/applications-cell.html\'">\n' +
			'</ep-table>');

		$templateCache.put('components/applications/applications.html', '<md-nav-bar md-selected-nav-item="$ctrl.currentNavItem" nav-bar-aria-label="Application links">\n' +
			'\n' +
			'    <md-nav-item md-nav-click="$ctrl.currentNavItem = \'applications_summary\'" name="applications_summary">\n' +
			'        Summary\n' +
			'    </md-nav-item>\n' +
			'\n' +
			'    <md-nav-item md-nav-click="$ctrl.currentNavItem = \'applications_details\'" name="applications_details">\n' +
			'        Details\n' +
			'    </md-nav-item>\n' +
			'</md-nav-bar>\n' +
			'\n' +
			'<applications-summary ng-if="$ctrl.currentNavItem == \'applications_summary\'" get-applications="$ctrl.getApplications(query)" create="$ctrl.create()">\n' +
			'</applications-summary>\n' +
			'\n' +
			'<applications-table ng-if="$ctrl.currentNavItem == \'applications_details\'" get-applications="$ctrl.getApplications(query)" create="$ctrl.create()">\n' +
			'</applications-table>');

		$templateCache.put('components/ep-table/ep-table.html', '<md-card>\n' +
			'  <md-toolbar class="md-table-toolbar md-default" ng-hide="$ctrl.selected.length || $ctrl.filter.show">\n' +
			'    <div class="md-toolbar-tools">\n' +
			'      <h2 class="md-title">{{ $ctrl.title }}</h2>\n' +
			'      <div flex></div>\n' +
			'      <md-button class="md-icon-button" ng-click="$ctrl.filter.show = true">\n' +
			'        <md-icon>search</md-icon>\n' +
			'      </md-button>\n' +
			'      <md-button class="md-icon-button" ng-click="$ctrl.create($event)">\n' +
			'        <md-icon>add</md-icon>\n' +
			'      </md-button>\n' +
			'    </div>\n' +
			'  </md-toolbar>\n' +
			'\n' +
			'  <md-toolbar class="md-table-toolbar md-default" ng-show="$ctrl.filter.show && !$ctrl.selected.length">\n' +
			'    <div class="md-toolbar-tools">\n' +
			'      <md-icon>search</md-icon>\n' +
			'      <form flex name="$ctrl.form">\n' +
			'        <md-input-container class="filter-container">\n' +
			'          <input ng-model="$ctrl.query.filter" ng-model-options="$ctrl.filter.options">\n' +
			'        </md-input-container>\n' +
			'      </form>\n' +
			'      <md-button class="md-icon-button" ng-click="$ctrl.hideFilter()">\n' +
			'        <md-icon>close</md-icon>\n' +
			'      </md-button>\n' +
			'    </div>\n' +
			'  </md-toolbar>\n' +
			'\n' +
			'  <md-toolbar class="md-table-toolbar alternate" ng-show="$ctrl.selected.length">\n' +
			'    <div class="md-toolbar-tools" layout-align="space-between">      \n' +
			'      <div>{{$ctrl.data.length}} {{$ctrl.selected.length > 1 ? \'items\' : \'item\'}} selected</div>\n' +
			'      <md-button class="md-icon-button" ng-click="$ctrl.delete($event)">\n' +
			'        <md-icon>delete</md-icon>\n' +
			'      </md-button>\n' +
			'    </div>\n' +
			'  </md-toolbar>\n' +
			'\n' +
			'  <md-table-container>\n' +
			'    <table md-table>\n' +
			'      <thead md-head md-row-select="true" multiple="true" ng-model="$ctrl.data" md-progress="$ctrl.loading" md-order="$ctrl.query.order" md-on-reorder="$ctrl.get">\n' +
			'        <tr md-row ng-include="$ctrl.headerTemplate">               \n' +
			'        </tr>\n' +
			'      </thead>\n' +
			'      <tbody md-body>\n' +
			'        <tr md-row md-select="row" md-select-id="id" md-auto-select ng-repeat="row in $ctrl.data | orderBy: $ctrl.query.order" ng-include="$ctrl.cellTemplate" onload="data = row">        \n' +
			'        </tr>\n' +
			'      </tbody>\n' +
			'    </table>\n' +
			'  </md-table-container>\n' +
			'\n' +
			'  <md-table-pagination md-limit="$ctrl.query.limit" md-page="$ctrl.query.page" md-total="{{$ctrl.count}}" md-on-paginate="$ctrl.get" md-page-select>\n' +
			'  </md-table-pagination>\n' +
			'</md-card>');

		$templateCache.put('components/event-planner-app/event-planner-app.html', '<div layout="column" class="app-container" ng-cloak>\n' +
			'  <md-toolbar md-scroll-shrink>\n' +
			'    <div class="md-toolbar-tools">\n' +
			'      <h3>\n' +
			'        <span>Event Planner</span>\n' +
			'      </h3>\n' +
			'\n' +
			'      <md-button ui-sref="home">\n' +
			'        Home\n' +
			'      </md-button>\n' +
			'\n' +
			'      <md-button ui-sref="applications">\n' +
			'        Applications\n' +
			'      </md-button>\n' +
			'\n' +
			'      <md-button ui-sref="acts">\n' +
			'        Acts\n' +
			'      </md-button>\n' +
			'    </div>\n' +
			'  </md-toolbar>\n' +
			'\n' +
			'  <md-content flex>\n' +
			'    <ui-view></ui-view>\n' +
			'  </md-content>\n' +
			'</div>');
	}
]);
