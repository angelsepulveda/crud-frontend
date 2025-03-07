export type TPaginationPayloadDto = {
	pageSize: number;
	search: string;
	pageNumber: number;
};

export type TPaginationResponseDto<T> = {
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalRecords: number;
	data: T[];
};
