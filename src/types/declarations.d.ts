declare namespace app {
	export const apiBasePath: string;
	export const basePath: string;
}
declare module '*.module.less' {
	const classes: { [key: string]: string }
	export default classes
}