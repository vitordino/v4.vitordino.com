import * as radixColors from '@radix-ui/colors'

type V = string | Record<string, string> | Record<string, Record<string, string>>

type MapKeys = (v: V, cb: (s: string) => string) => Record<string, string>

const mapKeys: MapKeys = (v, cb) =>
	Object.entries(v).reduce(
		(out, [key, value]) => ({
			...out,
			[cb(key)]: typeof value === 'object' ? mapKeys(value, cb) : value,
		}),
		{},
	)

// Just makes the names more Tailwindish.
const keyTransformer = (key: string) => {
	if (key.endsWith('DarkA')) return key.replace('DarkA', '-dark-alpha')
	if (key.endsWith('Dark')) return key.replace('Dark', '-dark')
	if (key.endsWith('A')) return key.replace('A', '-alpha')
	// Removes the color name and A from the color key...
	return /\d$/.test(key) ? key.replace(/[a-z]/gi, '') : key
}

export const colors = mapKeys(radixColors, keyTransformer)
