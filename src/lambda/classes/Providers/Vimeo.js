import VideoProvider from '../VideoProvider';
import fetch from 'node-fetch';

// https://vimeo.com/

export default class Vimeo extends VideoProvider {
    static get regex() {
        return [
            // - //vimeo.com/263856289
            /https?\:\/\/vimeo\.com\/([0-9]+)/,

            // - //vimeo.com/channels/staffpicks/287019927
            /https?\:\/\/vimeo\.com\/channels\/[\w]+\/([0-9]+)/,
        ];
    }

    getThumbnail_asUrl() {
        const endpoint = `https://vimeo.com/api/v2/video/${this.getId()}.json`;

        return fetch(endpoint)
            .then(response => response.json())
            .then(json => json[0].thumbnail_large.replace(/_[0-9]+.jpg/, '_720.jpg'))
    }
}
