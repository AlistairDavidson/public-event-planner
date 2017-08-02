'use strict';

// file automatically generated by angular-template-cache

angular
	.module('templates', [])
	.run(['$templateCache', function($templateCache) {
		$templateCache.put('components/acts/acts.html', '');

		$templateCache.put('components/application-card/application-card.html', '<md-card>\n' +
			'    <img ng-if="$ctrl.application.image" src="{{ $ctrl.application.image }}" class="md-card-image">\n' +
			'\n' +
			'    <md-card-title>\n' +
			'        <md-card-title-text>\n' +
			'            <span class="md-headline">{{ $ctrl.application.name }}</span>\n' +
			'            <span class="md-subhead">{{ $ctrl.application.createdAt | date: \'mediumDate\' }} - {{ $ctrl.application.type }}, {{ $ctrl.application.town }}, {{ $ctrl.application.requested_fee }}</span>\n' +
			'            <p>{{ $ctrl.application.bio }}</p>\n' +
			'        </md-card-title-text>\n' +
			'    </md-card-title>\n' +
			'\n' +
			'    <md-card-actions layout="row" layout-align="end center">\n' +
			'        <md-button ng-if="$ctrl.application.link" href="{{ $ctrl.application.link }}" target="_blank">\n' +
			'            <md-icon>link</md-icon> Website\n' +
			'        </md-button>\n' +
			'        <md-button ng-if="$ctrl.application.facebook" href="{{ $ctrl.application.facebook }}" target="_blank">\n' +
			'            <md-icon md-svg-icon="community:facebook"></md-icon> Facebook\n' +
			'        </md-button>\n' +
			'        <md-button ng-if="$ctrl.application.twitter" href="{{ $ctrl.application.twitter }}" target="_blank">\n' +
			'            <md-icon md-svg-icon="community:twitter"></md-icon> Twitter\n' +
			'        </md-button>\n' +
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

		$templateCache.put('components/applications-summary/applications-summary.html', '<md-content class="md-padding" layout="column" flex="80" flex-offset="10">    \n' +
			'    <application-card ng-repeat="application in $ctrl.applications" application="application">\n' +
			'    </application-card>\n' +
			'</md-content>');

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
			'    <md-menu>\n' +
			'      <md-button aria-label="Application contact menu" class="md-icon-button" ng-click="$mdMenu.open($event)">\n' +
			'        <md-icon md-menu-origin>phone</md-icon>\n' +
			'      </md-button>\n' +
			'\n' +
			'      <md-menu-content width="4">\n' +
			'        <md-menu-item>\n' +
			'          <md-button ng-if="data.link" ng-href="{{ data.link }}" target="_blank">\n' +
			'            <md-icon>link</md-icon> Website\n' +
			'          </md-button>\n' +
			'        </md-menu-item>\n' +
			'        \n' +
			'        <md-menu-item>\n' +
			'          <md-button ng-if="data.facebook" ng-href="{{ data.facebook }}" target="_blank">\n' +
			'            <md-icon md-svg-icon="community:facebook"></md-icon> Facebook\n' +
			'          </md-button>\n' +
			'        </md-menu-item>\n' +
			'\n' +
			'        <md-menu-item>\n' +
			'          <md-button ng-if="data.twitter" ng-href="{{ data.twitter }}" target="_blank">\n' +
			'            <md-icon md-svg-icon="community:twitter"></md-icon> Twitter\n' +
			'          </md-button>\n' +
			'        </md-menu-item>\n' +
			'      </md-menu-content>\n' +
			'    </md-menu>\n' +
			'  </td>\n' +
			'</script>\n' +
			'\n' +
			'<ep-table title="\'Applications\'" on-list="$ctrl.getApplications(query)" on-create="$ctrl.create()" header-template="\'/applications-header.html\'" cell-template="\'/applications-cell.html\'">\n' +
			'</ep-table>');

		$templateCache.put('components/applications/applications.html', '<md-nav-bar md-selected-nav-item="$ctrl.currentNavItem">\n' +
			'    <md-nav-item md-nav-sref="applications.summary" name="applications.summary">\n' +
			'        Summary\n' +
			'    </md-nav-item>\n' +
			'\n' +
			'    <md-nav-item md-nav-sref="applications.detail" name="applications.detail">\n' +
			'        Details\n' +
			'    </md-nav-item>\n' +
			'</md-nav-bar>\n' +
			'\n' +
			'<ui-view>\n' +
			'</ui-view>');

		$templateCache.put('components/ep-table/ep-table.html', '<md-card>\n' +
			'  <md-toolbar class="md-table-toolbar md-default" ng-hide="$ctrl.selected.length || $ctrl.filter.show">\n' +
			'    <div class="md-toolbar-tools">\n' +
			'      <h2 class="md-title">{{ $ctrl.title }}</h2>\n' +
			'      <div flex></div>\n' +
			'      <md-button class="md-icon-button" ng-click="$ctrl.showFilter()">\n' +
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
			'          <input ng-model="$ctrl.query.filter" ng-model-options="$ctrl.filter.options" aria-label="Filter table" id="table-filter">\n' +
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
			'      <md-button hide-gt-sm aria-label="Menu" class="md-fab md-menu-button fixed" ng-click="$ctrl.openSidenav()">                        \n' +
			'            <md-icon>&#xE5D2;</md-icon>    \n' +
			'      </md-button>\n' +
			'\n' +
			'      <h3>\n' +
			'        <span>Event Planner</span>\n' +
			'      </h3>\n' +
			'\n' +
			'      <md-button ui-sref="home">\n' +
			'        Home\n' +
			'      </md-button>\n' +
			'\n' +
			'      <md-button ui-sref="applications.summary">\n' +
			'        Applications\n' +
			'      </md-button>\n' +
			'\n' +
			'      <md-button ui-sref="acts">\n' +
			'        Acts\n' +
			'      </md-button>\n' +
			'    </div>\n' +
			'  </md-toolbar>\n' +
			'\n' +
			'<md-sidenav class="md-sidenav-left" md-component-id="left" md-whiteframe="4">\n' +
			'\n' +
			'            <md-toolbar>\n' +
			'                  <h1 class="md-toolbar-tools">\n' +
			'                        <md-button class="md-icon-button" ng-click="$ctrl.closeSidenav()">\n' +
			'                              <md-icon>&#xE5D2;</md-icon>\n' +
			'                        </md-button>\n' +
			'                        <span class="toolbar-title">Menu</span>\n' +
			'                  </h1>\n' +
			'            </md-toolbar>\n' +
			'            <md-content layout-padding layout="column">\n' +
			'                  <md-button ui-sref="home" ng-click="$ctrl.closeSidenav()" ng-disabled="$ctrl.currentNavItem == \'home\'" class="md-raised md-primary md-hue-2">\n' +
			'                        Home\n' +
			'                  </md-button>\n' +
			'                  <br>\n' +
			'                  <md-button ui-sref="applications.summary" ng-click="$ctrl.closeSidenav()" ng-disabled="$ctrl.currentNavItem == \'applications.summary\'" class="md-raised md-primary md-hue-2">\n' +
			'                        Applications\n' +
			'                  </md-button>\n' +
			'                  <br>\n' +
			'                  <md-button ui-sref="acts" ng-click="$ctrl.closeSidenav()" ng-disabled="$ctrl.currentNavItem == \'acts\'" class="md-raised md-primary md-hue-2">\n' +
			'                        Acts\n' +
			'                  </md-button>\n' +
			'                  <br>      \n' +
			'            </md-content>\n' +
			'      </md-sidenav>\n' +
			'  \n' +
			'  <md-content flex>\n' +
			'    <ui-view></ui-view>\n' +
			'  </md-content>\n' +
			'</div>');
	}
]);
