import { Team } from '@models/db'
import { open } from '@tauri-apps/plugin-dialog'
import { readFile } from '@tauri-apps/plugin-fs'

export const uint8ArrayStringToUint8Array = (string: string) =>
  new Uint8Array(JSON.parse(string) as number[])

/**
 * Opens a file selection dialog to choose a PNG file.
 *
 *
 * @returns A promise that resolves with the selected PNG file path,
 * or null if the selection is cancelled.
 */
export const openPngFile = async () =>
  await open({ filters: [{ name: 'PNG', extensions: ['png'] }] })

/**
 * Reads a PNG file from the specified path and returns its content as a Uint8Array.
 *
 * @param path - The file path to the PNG image.
 * @returns A promise that resolves to a Uint8Array containing the PNG image data.
 */
export const pngBytesToBlob = (array: Uint8Array) =>
  new Blob([array], { type: 'image/png' })

/**
 * Converts a PNG file at the provided path into a Blob.
 *
 * @param path - The file path to the PNG image.
 * @returns A promise that resolves to a Blob containing the PNG image data.
 */
export const pngFileToBlob = async (path: string) => pngBytesToBlob(await readFile(path))

/**
 * Converts a PNG array into a Blob URL.
 *
 * @param array - The PNG image data as a Uint8Array.
 * @returns A Blob URL representing the PNG image.
 */
export const pngBytesToURL = (array: Uint8Array) =>
  URL.createObjectURL(pngBytesToBlob(array))

/**
 * Converts a PNG file specified by its file path into a Blob and generates a URL for it.
 *
 * @param path - The file path of the PNG image to process.
 * @returns A Promise that resolves to a URL string representing the PNG Blob.
 */
export const pngFileToURL = async (path: string) =>
  URL.createObjectURL(await pngFileToBlob(path))

/**
 * Opens a file dialog that filters and displays only SVG files.
 *
 * @returns A promise that resolves with the selected SVG file path, or undefined if no file is selected.
 */
export const openSvgFile = async () =>
  await open({ filters: [{ name: 'SVG', extensions: ['svg'] }] })

/**
 * Reads the file content from the specified path and returns it as a string.
 *
 * @param path - The file system path to the file.
 * @returns A promise that resolves with the file's content as a string.
 */
export const fileToString = async (path: string) =>
  new TextDecoder().decode(await readFile(path))

/**
 * Parses a given string as an SVG XML document and retrieves the first SVG element.
 *
 * @param string - The input string containing the SVG markup.
 * @returns The first SVG element found in the parsed document, or null if no SVG element is present.
 */
export const stringToSvg = (string: string) =>
  new DOMParser().parseFromString(string, 'image/svg+xml').querySelector('svg')

/**
 * Converts an SVG file at the specified path into an SVG representation.
 *
 * @param path - The file system path of the SVG file.
 * @returns A promise that resolves to a string containing the SVG data.
 */
export const svgFileToSvg = async (path: string) => stringToSvg(await fileToString(path))

/**
 * Ensures that the given SVG element includes the correct XML namespace.
 *
 * This function checks if the provided SVG element has the "xmlns" attribute set.
 * If the attribute is missing, it adds "http://www.w3.org/2000/svg" as the namespace.
 *
 * @param svg - The SVG element to check and fix.
 * @returns The modified SVG element with the "xmlns" attribute guaranteed to be present.
 */
export const svgWithXmlnsFix = (svg: SVGSVGElement) => {
  if (!svg.getAttribute('xmlns')) svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  return svg
}

/**
 * Reads an SVG file from the specified path and returns an SVG string with the xmlns attribute fixed.
 *
 * This function first loads the SVG file content using `svgFileToSvg`, and then processes the SVG
 * string with `svgWithXmlnsFix` to ensure that the xmlns attribute is correctly set.
 *
 * @param path - The file path of the SVG file.
 * @returns A promise that resolves to an SVG string with the fixed xmlns attribute.
 */
export const svgFileToSvgWithXmlnsFix = async (path: string) =>
  svgWithXmlnsFix(await svgFileToSvg(path))

/**
 * Serializes an SVG element into a string.
 *
 * @param svg - The SVG element that will be converted to a string.
 * @returns The string representation of the provided SVG element.
 */
export const svgToString = (svg: SVGSVGElement) =>
  new XMLSerializer().serializeToString(svg)

/**
 * Reads an SVG file from the specified path, applies XML namespace fixes, and converts it to a string.
 *
 * This function asynchronously processes the SVG file by first fixing its XML namespace issues using
 * svgFileToSvgWithXmlnsFix, and then converting the resulting SVG element to a string using svgToString.
 *
 * @param path - The file path to the SVG file.
 * @returns A Promise that resolves to the string representation of the SVG with corrected XML namespaces.
 */
export const svgFileToStringWithXmlnsFix = async (path: string) =>
  svgToString(await svgFileToSvgWithXmlnsFix(path))

/**
 * Converts an SVG file to a Blob after fixing its xmlns attribute.
 *
 * This async function reads the SVG file from the provided path, applies necessary fixes
 * to the XML namespace declarations, and returns a Blob object containing the modified SVG data.
 *
 * @param path - The file system path to the SVG file.
 * @returns A Promise that resolves to a Blob representing the SVG file with the xmlns attribute fixed.
 */
export const svgFileToBlobWithXmlnsFix = async (path: string) =>
  new Blob([await svgFileToStringWithXmlnsFix(path)], { type: 'image/svg+xml' })

/**
 * Converts an SVG file located at the given path into a Blob URL, ensuring that the XML namespace is properly fixed.
 *
 * This function retrieves the SVG file, applies any necessary fixes to its XML namespace,
 * and creates a Blob URL that can be used within the application.
 *
 * @param path - A string representing the file system path to the SVG file.
 * @returns A promise that resolves to a Blob URL representing the fixed SVG content.
 */
export const svgFileToURLWithXmlnsFix = async (path: string) =>
  URL.createObjectURL(await svgFileToBlobWithXmlnsFix(path))

/**
 * Iterates over an array of teams, fixing each team's logo using the fixTeamLogo function.
 *
 * @param teams - An array of Team objects that will have their logos fixed.
 * @returns The same array of Team objects after applying logo fixes.
 */
export const fixTeamLogos = (teams: Team[]) => {
  for (let i = 0; i < teams.length; i++) fixTeamLogo(teams[i])
  return teams
}

/**
 * Converts the team's logo from a string representation to a Uint8Array.
 *
 * This function interprets the team's logo property (assumed to be a string) using the
 * uint8ArrayStringToUint8Array conversion, and updates the team.logo property with the
 * resulting Uint8Array.
 *
 * @param team - The team object whose logo property will be converted.
 */
export const fixTeamLogo = (team: Team) => {
  team.logo = uint8ArrayStringToUint8Array(team.logo as unknown as string)
  return team
}
