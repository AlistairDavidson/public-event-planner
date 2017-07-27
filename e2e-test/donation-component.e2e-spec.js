"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var donation_component_page_object_1 = require("./donation-component-page-object");
var donationPage = new donation_component_page_object_1.default();
describe('Donation component', function () {
    donationPage.go();
    it('has a pane of 5 buttons', function () {
        var buttons = protractor_1.element.all(donationPage.amountButtons());
        expect(buttons.count()).toEqual(5);
    });
    it('can\'t click the Donate button with no value selected', function () {
        var button = protractor_1.element(donationPage.nextButton());
        button.click();
        var amountButtons = protractor_1.element.all(donationPage.amountButtons());
        expect(amountButtons.count()).toEqual(5);
    });
    it('can select a value', function () {
        var button = protractor_1.element.all(donationPage.amountButtons()).get(0);
        button.click();
        var selectedButton = protractor_1.element(donationPage.selectedAmount());
        expect(button.equals(selectedButton)).toEqual(true);
    });
    it('can select another value', function () {
        var button = protractor_1.element.all(donationPage.amountButtons()).get(3);
        button.click();
        var selectedButton = protractor_1.element(donationPage.selectedAmount());
        expect(button.equals(selectedButton)).toEqual(true);
    });
    it('other changes colour when letters are entered', function () {
        var other = protractor_1.element(donationPage.otherInput());
        other.sendKeys('abc').then();
        expect(other.getAttribute('class')).toMatch('ng-invalid');
    });
    it('can enter a value into other', function () {
        var other = protractor_1.element(donationPage.otherInput());
        other.clear();
        other.sendKeys('13');
        expect(other.getAttribute('class')).toMatch('ng-valid');
    });
    it('can enter a value with a pound sign into other', function () {
        var other = protractor_1.element(donationPage.otherInput());
        other.clear();
        other.sendKeys('£13');
        expect(other.getAttribute('class')).toMatch('ng-valid');
    });
    it('can proceed to the next page once a value is selected', function () {
        var button = protractor_1.element(donationPage.nextButton());
        button.click();
        var amountButtons = protractor_1.element.all(donationPage.amountButtons());
        expect(amountButtons.count()).toEqual(0);
    });
});
