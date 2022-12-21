import { fail, type ActionFailure } from '@sveltejs/kit';
import type { z, ZodError } from 'zod';

const RESPONSE_STATUS_CODE = 400;

export interface IValidationFailure<T> {
	valid: false;
	/**
	 * The action failure that can be returned from a SvelteKit action
	 */
	failure: ActionFailure<IFailure>;
}

export interface IValidationSuccess<T> {
	valid: true;
	/**
	 * The parsed and validated data.
	 */
	data: T;
	/**
	 * Can be called to create an action failure with the given errors
	 * @param errors
	 * @returns
	 */
	fail: (errors: Partial<T> & IGlobalValidationError) => ActionFailure<IFailure>;
}

export interface IFailure extends Record<string, unknown> {
	data: Record<string, FormDataEntryValue>;
	errors: Record<string, string>;
}

export interface IGlobalValidationError {
	/**
	 * A global error message that will be displayed at the top of a form
	 */
	global?: string;
}

/**
 * Parses form data and validates it against a zod schema.
 * @param request
 * @param validationSchema
 * @returns
 */
export async function parseFormData<T>(
	request: Request,
	validationSchema: z.ZodSchema<T>
): Promise<IValidationFailure<T> | IValidationSuccess<T>> {
	const formData = Object.fromEntries(await request.formData());
	const formDataParsed = validationSchema.safeParse(formData);
	const data = formDataToSendBackToClient(formData);

	if (!formDataParsed.success) {
		const errors = transformZodErrorsForClient(formDataParsed.error);
		const failure = fail(RESPONSE_STATUS_CODE, { data, errors });
		return { valid: false, failure };
	} else {
		return {
			valid: true,
			data: formDataParsed.data,
			fail: (errors: Partial<T>) => {
				return fail(RESPONSE_STATUS_CODE, { data, errors: errors as Record<string, string> });
			}
		};
	}
}

function formDataToSendBackToClient(formData: Record<string, FormDataEntryValue>) {
	const data = Object.fromEntries(
		Object.entries(formData).filter(([key]) => {
			// Do not send back password
			return key !== 'password';
		})
	);
	return data;
}

function transformZodErrorsForClient(error: ZodError) {
	const transformedErrors = error.issues.reduce((prev, issue) => {
		const { path, message } = issue;
		const field = path[0];
		prev[field] = message;
		return prev;
	}, {} as Record<string, string>);

	return transformedErrors;
}
