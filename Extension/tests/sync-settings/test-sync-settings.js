// QUnit.test("Test settings provider", function (assert) {
//     var done = assert.async();
//
//     adguard.localStorage.setItem('filters-state', JSON.stringify([]));
//
//     adguard.localStorage.setItem('white-list-domains', JSON.stringify(['whitelisted-domain-one.com']));
//     adguard.localStorage.setItem('default-whitelist-mode', true);
//
//     adguard.localStorage.setItem('filterrules_0.txt', '||ongkidcasarv.com^$third-party\n' +
//         '||dashgreen.online^$third-party\n' +
//         '||adzos.com^$third-party\n' +
//         '||mxtads.com:8040');
//
//     adguard.filtersState.updateFilterState({
//         filterId: 1,
//         loaded: true,
//         enabled: true,
//         installed: true
//     });
//
//     adguard.filtersState.updateFilterState({
//         filterId: 3,
//         loaded: true,
//         enabled: true,
//         installed: true
//     });
//
//     adguard.filtersState.updateFilterState({
//         filterId: 5,
//         loaded: true,
//         enabled: false,
//         installed: true
//     });
//
//     adguard.filtersState.updateFilterState({
//         filterId: 7,
//         loaded: true,
//         enabled: false,
//         installed: true
//     });
//
//     adguard.localStorage.setItem('sync.settings.timestamp', new Date().getTime() - 10000);
//
//     var before = SettingsProvider.loadSettingsManifest();
//     assert.ok(before != null);
//     assert.ok(before.timestamp);
//     assert.ok(before["protocol-version"]);
//     assert.ok(before["min-compatible-version"]);
//     assert.ok(before["app-id"]);
//     assert.ok(before["sections"].length > 0);
//
//     SettingsProvider.saveSettingsManifest(before);
//
//     var updated = SettingsProvider.loadSettingsManifest();
//     assert.ok(updated != null);
//     assert.equal(updated.timestamp, before.timestamp);
//     assert.equal(updated["protocol-version"], before["protocol-version"]);
//     assert.equal(updated["min-compatible-version"], before["min-compatible-version"]);
//     assert.equal(updated["app-id"], before["app-id"]);
//     assert.equal(updated["sections"].length, before["sections"].length);
//
//     var onSectionUpdated = function (section) {
//         assert.ok(section);
//         assert.equal(section.filters["enabled-filters"].length, 3);
//         assert.equal(section.filters["enabled-filters"][0], 1);
//         assert.equal(section.filters["enabled-filters"][1], 5);
//         assert.equal(section.filters["enabled-filters"][2], 7);
//
//         var userRules = section.filters["user-filter"].rules.split('\n');
//         assert.equal(userRules.length, 5);
//         assert.equal(userRules[0], "||ongkidcasarv.com^$third-party");
//         assert.equal(userRules[1], "||dashgreen.online^$third-party");
//         assert.equal(userRules[2], "||adzos.com^$third-party");
//         assert.equal(userRules[3], "||mxtads.com:8040");
//         assert.equal(userRules[4], "test-add-rule");
//
//         assert.equal(section.filters["whitelist"].domains.length, 2);
//         assert.equal(section.filters["whitelist"].domains[0], 'whitelisted-domain-one.com');
//         assert.equal(section.filters["whitelist"].domains[1], 'whitelisted-domain-two.com');
//         assert.equal(section.filters["whitelist"].inverted, true);
//
//         done();
//     };
//
//     var onSectionSaved = function (result) {
//         assert.ok(result);
//         SettingsProvider.loadSettingsSection(filtersPath, onSectionUpdated);
//     };
//
//     var onSectionLoaded = function (section) {
//         assert.ok(section);
//         assert.equal(section.filters["enabled-filters"].length, 2);
//         assert.equal(section.filters["enabled-filters"][0], 1);
//         assert.equal(section.filters["enabled-filters"][1], 3);
//
//         var userRules = section.filters["user-filter"].rules.split('\n');
//         assert.equal(userRules.length, 4);
//         assert.equal(userRules[0], "||ongkidcasarv.com^$third-party");
//         assert.equal(userRules[1], "||dashgreen.online^$third-party");
//         assert.equal(userRules[2], "||adzos.com^$third-party");
//         assert.equal(userRules[3], "||mxtads.com:8040");
//
//         assert.equal(section.filters["whitelist"].domains.length, 1);
//         assert.equal(section.filters["whitelist"].domains[0], 'whitelisted-domain-one.com');
//         assert.equal(section.filters["whitelist"].inverted, false);
//
//         //Modify
//         section.filters["user-filter"].rules += '\ntest-add-rule';
//         section.filters["enabled-filters"].splice(1);
//         section.filters["enabled-filters"].push("5");
//         section.filters["enabled-filters"].push("7");
//         section.filters["whitelist"].domains.push('whitelisted-domain-two.com');
//         section.filters["whitelist"].inverted = true;
//
//         SettingsProvider.saveSettingsSection(filtersPath, section, onSectionSaved);
//     };
//
//     SettingsProvider.loadSettingsSection(filtersPath, onSectionLoaded);
// });