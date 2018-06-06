import {expect} from 'chai';
import * as util from '../src/util';

const fixture =
`<div id="FIXTURE"></div>
<div class="FIXTURE"></div>`

describe('getElement', () => {
  it('should get Element', () => {
    document.body.innerHTML = fixture;
    let testEl = document.getElementById('FIXTURE');
    let testElClass = document.body.querySelector('.FIXTURE');
    let byHTMLElement = util.getElement(testEl);
    let byID = util.getElement('#FIXTURE');
    let byClass = util.getElement('.FIXTURE');
    expect(byHTMLElement).to.equal(testEl, 'by using HTMLElement');
    expect(byID).to.equal(testEl, 'by using selector(id)');
    expect(byClass).to.equal(testElClass, 'by using selector(class)');
  });
});