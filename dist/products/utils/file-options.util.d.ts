export declare const fileOptions: {
    schema: {
        type: string;
        properties: {
            files: {
                type: string;
                items: {
                    type: string;
                    format: string;
                };
            };
        };
    };
};
export declare const singleFileOptions: {
    schema: {
        type: string;
        properties: {
            file: {
                type: string;
                format: string;
            };
        };
    };
};
