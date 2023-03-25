const urlHelper = {
    getUrlByTemplate: (template, parameters) => {
        for (const key in parameters) {
            template = template.replace(`:${key}`, parameters[key]);
        }

        return template;
    }
};

export default urlHelper;