'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import { setBackgroundImage } from './Transformers';

export default class Gallery extends Component {
    render() {
        if (this.props.type === 'preview') {
            return (
                <preview>
                    {
                        this.props.photos.map(function(photo, index) {
                            let style = setBackgroundImage(photo.thumb);

                            return (
                                <photo key={index} style={style} />
                            )
                        })
                    }
                </preview>
            );
        } else {
            return (
                <gallery>
                    {
                        window.tempPhotoStore.map(function(photo, index) {
                            let style = setBackgroundImage(photo.thumb);

                            return (
                                <photo key={index} style={style} />
                            )
                        })
                    }
                </gallery>
            );
        }
    }
};

export class GalleryPreview extends Component {
    render() {
        const appSettings = window.appSettings,
            lang = window.lang,
            path = this.props.path + '/gallery',
            id = this.props.id,
            photos = this.props.photos,
            preview = photos.slice(0, appSettings.maxPhotoPreviewsPerGallery),
            more = (photos.length > appSettings.maxPhotoPreviewsPerGallery) ? <Link className="text-more" to={`${path}`}>{lang.morePhotos}</Link> : null;

            window.tempPhotoStore = photos;

        return (
            <section>
                <header>
                    <h1>{lang.photos}</h1>
                    { more }
                </header>
                <Gallery type="preview" photos={preview} />
            </section>
        );
    }
};
