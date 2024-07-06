import { Survey, SyncResponse, Informant } from '../components/sync/sync.types';

export const orderWorkloadInformants = (responseWorkload: SyncResponse, surveys: Survey[]): SyncResponse => {
    responseWorkload.panels.forEach(panel => {
        const surveyOrder = surveys.find(survey => survey.order.some(o => o.panelId === panel.id));
        if (surveyOrder) {
            const panelOrder = surveyOrder.order.find(o => o.panelId === panel.id);
            if (panelOrder) {
                const informantOrder = panelOrder.order;
                const informantMap: { [key: number]: Informant } = {};
                panel.informants.forEach(informant => {
                    informantMap[informant.id] = informant;
                });
                panel.informants = informantOrder.map(id => informantMap[id]).filter(Boolean);
            }
        }
    });
    return responseWorkload;
};

