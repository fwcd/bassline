// Incomplete type definitions for
// https://github.com/aadsm/jsmediatags

declare module "jsmediatags" {
	export function read(file: string, callback: JSMTCallback);
	
	export interface JSMTCallback {
		onSuccess(tag: JSMTTag): void;
		
		onError(error: JSMTError): void;
	}
	
	export interface JSMTError {
		type: any;
		info: any;
	}
	
	export interface JSMTTag {
		type: string;
		tags: JSMTTags;
		version: string;
		ftyp?: string;
		major?: number;
		revision?: number;
		size?: number;
		flags?: any;
	}
	
	export interface JSMTTags {
		title?: string;
		artist?: string;
		album?: string;
		track?: string;
	}
}
