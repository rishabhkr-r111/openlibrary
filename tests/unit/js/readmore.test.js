import { initClampers, resetReadMoreButtons } from '../../../openlibrary/plugins/openlibrary/js/readmore';
import $ from 'jquery';

describe('resetReadMoreButtons', () => {
    const $dummyEl = $('<div class="a-parent"><div class="restricted-view"></div></div>');
    $dummyEl.appendTo(document.body);

    test('restricted view if big scroll height', () => {
        const restrictedViewEl = $dummyEl.find('.restricted-view')[0];
        jest.spyOn(restrictedViewEl, 'scrollHeight', 'get').mockImplementation(() => 100);
        resetReadMoreButtons();
        expect(restrictedViewEl.classList.contains('restricted-height')).toBe(true);
    });

    test('no restricted view if small scroll height', () => {
        const restrictedViewEl = $dummyEl.find('.restricted-view')[0];
        jest.spyOn(restrictedViewEl, 'scrollHeight', 'get').mockImplementation(() => 50);
        resetReadMoreButtons();
        expect(restrictedViewEl.classList.contains('restricted-height')).toBe(false);
        $dummyEl.remove();
    });
});

describe('initClampers', () => {
    test('clamp removed if not needed', () => {
        const clamper = document.createElement('div');
        clamper.classList.add('clamp');
        jest
            .spyOn(clamper, 'scrollHeight', 'get')
            .mockImplementation(() => 100);
        jest
            .spyOn(clamper, 'clientHeight', 'get')
            .mockImplementation(() => 100);
        initClampers([clamper]);
        expect(clamper.classList.contains('clamp')).toBe(false);

    });

    test('clamp not removed if  needed', () => {
        const clamper = document.createElement('div');
        clamper.classList.add('clamp');
        jest
            .spyOn(clamper, 'scrollHeight', 'get')
            .mockImplementation(() => 100);
        jest
            .spyOn(clamper, 'clientHeight', 'get')
            .mockImplementation(() => 10);
        initClampers([clamper]);
        expect(clamper.classList.contains('clamp')).toBe(true);

    });
});