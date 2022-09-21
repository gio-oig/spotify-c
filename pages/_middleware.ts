import { NextRequest, NextResponse } from "next/server";

const signedPages = ['/', '/playlist', '/library'];

export default function middleware(req: NextRequest) {
    const isSignedPage = signedPages.includes(req.nextUrl.pathname);

    if(isSignedPage) {
        const tokenFromCookie = req.cookies.ACCESS_TOKEN;

        if(!tokenFromCookie) {
            return NextResponse.redirect('/signin');
        }
    }
}