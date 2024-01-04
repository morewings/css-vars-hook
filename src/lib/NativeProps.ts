import type {AriaAttributes, HTMLAttributes} from 'react';

export type DataAttributeKey = `data-${string}`;

export type DataAttributes = Record<DataAttributeKey, string>;

export type LibraryProps<TElement = HTMLDivElement> = AriaAttributes & {
    id?: string;
    /**
     * Set native ARIA role attribute
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
     */
    role?: HTMLAttributes<TElement>['role'];
    /**
     * Specify additional CSS class. This allows you to use styled(Component)
     * or the css prop in styled-components or emotion.
     */
    className?: HTMLAttributes<TElement>['className'];
};
