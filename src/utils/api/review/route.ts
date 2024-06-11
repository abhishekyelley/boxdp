import { type NextRequest } from 'next/server';

import errorBuilder from '@/utils/api/utils/errorBuilder';
import UrlValidationError from '@/utils/api/utils/UrlValidationError';
import getReviewData from '@/utils/api/utils/getReviewData';
import { AxiosError } from 'axios';

const ipAddressRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

function validateUrl(url: string) {
    try {
        const url_obj = (new URL(url));   // throws TypeError if not a url

        if (ipAddressRegex.test((new URL(url)).hostname)) {
            throw new UrlValidationError(`pure number URLs are not accepted`);
        }

        if (url_obj.protocol !== 'https:') {
            throw new UrlValidationError(`protocol is invalid: ${url_obj.protocol}`);
        }

        url = (new URL(url)).href;  // proper https url

    } catch (err) {
        if (err instanceof UrlValidationError) {
            throw new UrlValidationError(
                err.message,
                422,
                url
            );
        }
        url = 'https://' + url;
        try {
            if (ipAddressRegex.test((new URL(url)).hostname)) {
                throw new UrlValidationError(`pure number URLs are not accepted`);
            }

            url = (new URL(url)).href;

        } catch (err) {
            if (err instanceof UrlValidationError) {
                throw new UrlValidationError(
                    err.message,
                    422,
                    url
                );
            }
        }
    }
    return url;
}

// TODO - Response object not needed, make it normal js obj.. look into app/review/page fetcher
export default async function getReview(url: string) {
    if (!url) {
        return Response.json(errorBuilder(
            "Missing required query param: url",
            422,
        ));
    }
    // actual business
    try {
        url = validateUrl(url);
        const res = await getReviewData(url);
        return Response.json(res);
    } catch (err) {
        if (err instanceof UrlValidationError) {
            return Response.json(errorBuilder(
                err.message,
                err.status,
                err.url
            ));
        }
        if (err instanceof AxiosError) {
            return Response.json(errorBuilder(
                err.message,
                err.status,
                url
            ));
        }
        console.log(err);
        return Response.json(errorBuilder(
            (err instanceof Error ? err?.message : undefined) || `internal server error`,
            500,
        ));
    }
}