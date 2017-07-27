import { browser, element, by } from 'protractor';
import DonationDonatePage from './donation-component-donate-page-object';

let donationDonatePage = new DonationDonatePage();

describe('Donation component donate page', () => {
    donationDonatePage.go();

    it('has a pane of 5 buttons', () => {
        let buttons = element.all( donationDonatePage.amountButtons());

        expect( buttons.count() ).toEqual( 5 );
    });

    it('can\'t click the Donate button with no value selected', () => {
        let button = element( donationDonatePage.nextButton() );
        button.click();
        let amountButtons = element.all( donationDonatePage.amountButtons() );

        expect( amountButtons.count() ).toEqual( 5 );
    });

    it('can select a value', () => {
        let button = element.all( donationDonatePage.amountButtons() ).get(0);
        button.click();
        let selectedButton = element( donationDonatePage.selectedAmount() );

        expect( button.equals(selectedButton) ).toEqual( true );
    });

    it('can select another value', () => {
        let button = element.all( donationDonatePage.amountButtons() ).get(3);
        button.click();
        let selectedButton = element( donationDonatePage.selectedAmount() );

        expect( button.equals(selectedButton) ).toEqual( true );
    });

    it('other changes colour when letters are entered', () => {
        let other = element( donationDonatePage.otherInput() );
        other.sendKeys('abc').then()

        expect( other.getAttribute('class') ).toMatch('ng-invalid');
    });

    it('can enter a value into other', () => {
        let other = element( donationDonatePage.otherInput() );
        other.clear();
        other.sendKeys('13');

        expect( other.getAttribute('class') ).toMatch('ng-valid');
    });

    it('can enter a value with a pound sign into other', () => {
        let other = element( donationDonatePage.otherInput() );
        other.clear();
        other.sendKeys('£13');

        expect( other.getAttribute('class') ).toMatch('ng-valid');
    });
    
    it('can proceed to the next page once a value is selected', () => {
        let button = element( donationDonatePage.nextButton() );
        button.click();
        let amountButtons = element.all( donationDonatePage.amountButtons() );

        expect( amountButtons.count() ).toEqual( 0 );
    });
});