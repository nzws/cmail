import { Flex } from "@radix-ui/themes";

import { NotFoundImage } from "@/app/components/not-found-image";

export default function Page() {
  return (
    <Flex justify="center" align="center" height="100%">
      <NotFoundImage />
    </Flex>
  );
}
