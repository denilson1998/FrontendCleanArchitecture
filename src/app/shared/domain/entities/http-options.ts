export interface HttpOptions {
  url: string;

  /**
   * Default value: true
   */
  needsAuthorization?: boolean;

  /**
   * Default value: null
   */
  body?: any;

  /**
   * Default value: 0 (request will not be cached)
   */
  cacheMins?: number;

  /**
   * Default value: null
   */
  additionalHeaders?: any;
}
