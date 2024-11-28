import { Informant, Panel, Survey } from '@/components/sync/sync.types';

type InformantMap = { [key: number]: Informant };

export const orderWorkloadInformants = (panels: Panel[], surveys: Survey[] = []): Panel[] =>
    panels.reduce((acc, panel) => {
        const surveyOrder = surveys.find((survey) => survey.order.some((o) => o.panelId === panel.id))?.order;

        if (surveyOrder?.length) {
            const panelOrder = surveyOrder.find((order) => order.panelId === panel.id)?.order;
            if (panelOrder?.length) {
                const excludedInformants = panel.informants.filter((informant) => !panelOrder.includes(informant.id));
                const informantMap: InformantMap = {};
                panel.informants.forEach((informant) => {
                    informantMap[informant.id] = informant;
                });
                panel.informants = panelOrder
                    .map((id) => informantMap[id])
                    .concat(excludedInformants)
                    .filter(Boolean);
            }
        }
        acc.push(panel);
        return acc;
    }, []);
