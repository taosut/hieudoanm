'use strict';

export interface CategoryRequestBody {
  name: string;
  photo: string;
  description: string;
  status: string;
}

export interface ApiRequestOptions {
  queryParams?: any;
  body?: any;
}

export interface ArticleRequestBody {
  title: string;
  description: string;
  /**
   * Normal
   */
  author?: string;
  cover?: PhotoCover | VideoCover;
  body?: Array<TextBody | ImageBody | VideoBody | ProductBody>;
  related_medias?: Array<RelatedMedia>;
  tracking_link?: string;
  /**
   * Video
   */
  video_id?: string;
  avatar?: string;
  /**
   * Optional
   */
  status?: string;
  comment?: string;
}

interface RelatedMedia {
  id: string;
}

interface PhotoCover {
  cover_type: string;
  photo_url: string;
  status: string;
}

interface VideoCover {
  cover_type: string;
  cover_view: string;
  video_id: string;
  status: string;
}

interface TextBody {
  type: string;
  content: string;
}

interface ImageBody {
  type: string;
  url: string;
  caption: string;
}

interface VideoBody {
  type: string;
  url: string;
  video_id: string;
  thumb: string;
}

interface ProductBody {
  type: string;
  id: string;
}
