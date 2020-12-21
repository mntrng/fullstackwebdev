import React from "react";
import { Icon } from "semantic-ui-react";

export const HealthEntryRating: React.FC<{ healthRating: number }> = ({ healthRating }) => {
    switch (healthRating) {
        case 0:
            return (
                <div>
                    <Icon name='heart' color='green' />
                </div>
            );
        case 1:
            return (
                <div>
                    <Icon name='heart' color='yellow' />
                </div>
            );
        case 2:
            return (
                <div>
                    <Icon name='heart' color='orange' />
                </div>
            );
        case 3:
            return (
                <div>
                    <Icon name='heart' color='red' />
                </div>
            );
        default:
            return null;
    }
};