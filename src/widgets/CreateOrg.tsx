import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import { Button } from "@/common/components/Button";
import { Input } from "@/common/components/Input";
import { useOrganizationMutation } from "@/reactQuery/queryOrg";

export function CreateOrg() {
  // state.
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [identificationCode, setIdentificationCode] = useState('');

  // query.
  const { mutate: createOrganization, isError, isSuccess, isPending } = useOrganizationMutation();

  const handleCreateOrganization = useCallback(() => {
    const trimmedCode = identificationCode.trim();
    if (!trimmedCode) {
      toast('빈 문자열은 입력할 수 없습니다.');
      return;
    }
    createOrganization({ code: trimmedCode });
  }, [identificationCode, createOrganization]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('조직 코드가 추가되었습니다.');
      return;
    }
    if (isError) {
      toast.error('조직 코드 추가에 실패했습니다.');
      return;
    }
  }, [isSuccess, isError]);

  return (
    !showCodeInput ? (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowCodeInput(true)}
      >
        우리들만의 메뉴 추첨기 만들기
      </Button>
    ) : (
      <div className="flex gap-2">
        <Input
          placeholder="ex) NAVER_1"
          value={identificationCode}
          onChange={(e) => {
            const value = e.target.value.replace(/[^a-zA-Z]/g, '');
            setIdentificationCode(value);
          }}
          maxLength={64}
          className="w-48 focus-visible:ring-0 h-[32px]"
        />
        <Button
          size="sm"
          disabled={isPending || !identificationCode.trim()}
          onClick={() => handleCreateOrganization()}
        >
          {isPending ? '로딩...' : '확인'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setShowCodeInput(false);
            setIdentificationCode('');
          }}
        >
          취소
        </Button>
      </div>
    )
  )
}