import type { SchemaTypeDefinition } from "sanity";

import { amenity } from "./amenity";
import { companyInfo, testimonial } from "./companyInfo";
import { project, schemaObjects } from "./project";
import { unitPlan, unitVariant } from "./unitPlan";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    unitPlan,
    unitVariant,
    amenity,
    companyInfo,
    testimonial,
    ...schemaObjects,
  ],
};
