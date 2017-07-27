import { browser, element, by } from 'protractor';

export default class DonationDonatePage {
    go() {
        browser.get('http://localhost:8000/demos/donate.html');
    }

    amountButtons() {
        return by.repeater('amount in $ctrl.amounts track by $index');
    }

    selectedAmount() {
        return by.className('donation_highlighted');
    }

    nextButton() {
        return by.buttonText('Donate');
    }

    otherInput() {
        return by.model('$ctrl.otherAmount');
    }
}