import path from 'path'
import { fileURLToPath } from 'url'

import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import * as regexpPlugin from 'eslint-plugin-regexp'
import pluginSecurity from 'eslint-plugin-security'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
	resolvePluginsRelativeTo: __dirname,
})

export default tseslint.config(
	{
		ignores: ['.next'],
	},

	{
		plugins: {
			'unused-imports': unusedImports,
		},
		rules: {
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},

	js.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	...fixupConfigRules(compat.extends('plugin:@next/next/recommended')),
	...fixupConfigRules(compat.extends('plugin:react/recommended')),
	...fixupConfigRules(compat.extends('plugin:react-hooks/recommended')),
	...fixupConfigRules(compat.extends('plugin:jsx-a11y/strict')),
	comments.recommended,
	regexpPlugin.configs['flat/recommended'],
	pluginSecurity.configs.recommended,
	eslintConfigPrettier,

	{
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{ prefer: 'type-imports', fixStyle: 'separate-type-imports' },
			],

			'@typescript-eslint/no-misused-promises': [
				'error',
				{ checksVoidReturn: { attributes: false } },
			],

			'@typescript-eslint/no-unnecessary-condition': [
				'error',
				{
					allowConstantLoopConditions: true,
				},
			],

			'react/react-in-jsx-scope': 'off',
		},
	}
)
