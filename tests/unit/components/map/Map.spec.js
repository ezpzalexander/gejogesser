import Map from '@/components/map/Map';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import appInit from '../../utils/appInit';
import createGoogleMapsMock from 'jest-google-maps-mock';

const args = appInit(createLocalVue());
global.google = {
    maps: createGoogleMapsMock(),
};
describe('Map.vue', () => {
    it('test methods', () => {
        const wrapper = shallowMount(Map, {
            ...args,
            propsData: {
                bbox: [0, 10, 20, 30],
            },
        });
        expect(wrapper.vm.markers).toHaveLength(0);
        wrapper.vm.putMarker({ lat: 0, lng: 1 });
        wrapper.vm.putMarker({ lat: 0, lng: 1 }, true);
        wrapper.vm.putMarker({ lat: 0, lng: 1 }, false, 'l');

        expect(global.google.maps.Marker).toHaveBeenCalledTimes(3);

        expect(wrapper.vm.markers).toHaveLength(3);
    });
});
